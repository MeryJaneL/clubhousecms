/**
 * User 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import { Resolver, Query, Mutation, Ctx, Arg, Int } from 'type-graphql';
import { Context } from '../../../express';
import { NftCreateInput } from '../inputs/NftCreate.input';
import { NftEntity } from '../entities/Nft.entity';
import { UserEntity } from 'server/models/User/entities/User.entity';
import { NftObject } from '../objects/Nft.object';
import { UserObject } from 'server/models/User/objects/User.object';
import { NftSearchInput } from '../inputs/NftSearch.input';
import { NftSearchOneInput } from '../inputs/NftSearchOne.input';
import Caver from 'caver-js';
import {
  NEXT_PUBLIC_WEB3_RPC_URL,
  NEXT_PUBLIC_MRLOGIN_ENDPOINT,
  NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  KLAY_PRIVATE_KEY,
} from '../../../../env.config';
@Resolver()
export class NftResolver {
  @Mutation(() => Boolean)
  async createNft(@Arg('data') data: NftCreateInput) {
    try {
      const tokenId = data.tokenId;

      const checkTokenId = await NftEntity.findOneBy({ tokenId: tokenId });

      if (!!checkTokenId) {
        console.log('이미 있는 토큰');
        return false;
      }

      console.log('1번');

      const caver = new Caver(
        new Caver.providers.HttpProvider(
          `${NEXT_PUBLIC_MRLOGIN_ENDPOINT}/provider/web3?rpc=${NEXT_PUBLIC_WEB3_RPC_URL}&privateKey=${KLAY_PRIVATE_KEY}`
        )
      );

      console.log('2번');

      caver.ipfs.setIPFSNode('ipfs.infura.io', 5001, true);

      console.log('3번', NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);

      const kip17 = new caver.kct.kip17(NEXT_PUBLIC_NFT_CONTRACT_ADDRESS);
      const owner = await kip17.ownerOf(tokenId);
      const tokenURI = await kip17.tokenURI(tokenId);
      const getData = await fetch(tokenURI).then((res) => res?.json());
      const category = !!getData?.category ? getData?.category : null;

      console.log('4번');

      const user = await UserEntity.findOneBy({ walletAddress: owner });
      const result = await NftEntity.create({
        tokenId: tokenId,
        user: user,
        tokenURI: tokenURI,
        category: category,
        image: !!getData?.image ? getData?.image : null,
        description: !!getData?.description ? getData?.description : null,
        name: !!getData?.name ? getData?.name : null,
      }).save();

      return !!result?.id;
    } catch (e) {
      console.log(e);
    }
  }

  //ctx값의 UserId를 가지고 자기 자신의 NFT 리턴해주는 리졸버
  @Query(() => [NftObject], { nullable: true })
  async myInfoByNftGet(@Ctx() ctx: Context) {
    try {
      const userId = ctx?.user?.userId;

      console.log(userId, '유저아이디');

      const result = await UserEntity.createQueryBuilder('user')
        .leftJoinAndSelect('user.nfts', 'nfts')
        .where('user.userId = :userId', { userId: userId })
        .getOne();

      console.log(result, '엔에프티쿼리');

      return result?.nfts;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //지갑주소를 받아와서 해당 지갑주소의 NFT를 리턴해주는 리졸버
  @Query(() => [NftObject], { nullable: true })
  async userInfoByNftGet(@Arg('data') data: NftSearchInput) {
    try {
      const walletAddress = data.walletAddress;

      console.log(walletAddress, '지갑주소');

      const result = await UserEntity.createQueryBuilder('user')
        .leftJoinAndSelect('user.nfts', 'nfts')
        .where('user.walletAddress = :walletAddress', {
          walletAddress: walletAddress,
        })
        .getOne();

      // console.log(result, '엔에프티쿼리');

      return result?.nfts;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //ctx값의 UserId와 Nft의 tokenId를 가지고 자신의 NFT 1개 리턴해주는 리졸버
  @Query(() => NftObject, { nullable: true })
  async myInfoByNftOneGet(@Ctx() ctx: Context, @Arg('data') data: NftSearchOneInput) {
    try {
      const userId = ctx?.user?.userId;
      const tokenId = data.tokenId;

      console.log(userId, '유저아이디');

      // const result = await UserEntity.createQueryBuilder('user').leftJoinAndSelect('user.nfts', 'nfts')
      //   .where('user.userId = :userId', {userId: userId})
      //   .andWhere('nfts.tokenId = :tokenId',{tokenId:tokenId})
      //   .getOne();

      const result = await NftEntity.createQueryBuilder('nft')
        .leftJoinAndSelect('nft.user', 'user')
        .where('user.userId = :userId', { userId: userId })
        .andWhere('nft.tokenId = :tokenId', { tokenId: tokenId })
        .getOne();

      console.log(result, '엔에프티쿼리');

      return result;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //tokenId를 가지고 유저의 NFT 1개 리턴해주는 리졸버
  @Query(() => NftObject, { nullable: true })
  async userInfoByNftOneGet(@Arg('data') data: NftSearchOneInput) {
    try {
      const tokenId = data.tokenId;

      const result = await NftEntity.findOneBy({ tokenId: tokenId });

      console.log(result, '엔에프티쿼리');

      return result;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //nft전체 목록 조회해오는 리졸버
  @Query(() => [NftObject], { nullable: true })
  async nftList(
    @Arg('take', () => Int, { nullable: true }) take: number,
    @Arg('skip', () => Int, { nullable: true }) skip: number
  ) {
    try {
      const result = await NftEntity.createQueryBuilder('nft')
        .leftJoinAndSelect('nft.user', 'user')
        .orderBy({ 'nft.id': 'DESC' })
        .skip(skip)
        .take(take)
        .getMany();

      return result;
    } catch (e) {
      console.log('nftList Error', e);
    }
  }

  //nft전체 갯수 조회해오는 리졸버
  @Query(() => Number, { nullable: true })
  async nftListCount() {
    try {
      const result = await NftEntity.createQueryBuilder('nft').getCount();

      return result;
    } catch (e) {
      console.log('nftListCount Error', e);
    }
  }
}
