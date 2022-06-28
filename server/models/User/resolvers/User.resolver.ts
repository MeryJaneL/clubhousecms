/**
 * User 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import { Resolver, Query, Mutation, Ctx, Arg, Int } from 'type-graphql';
import { UserEntity } from '../entities/User.entity';
import jwt from 'jsonwebtoken';
import { OAuthAccessTokenInput } from '../inputs/OAuthAccessToken.input';
import { UserUpdateInput } from '../inputs/UserUpdate.input';
import { Context } from '../../../express';
import { createQueryBuilder } from 'typeorm';
import { UserObject } from '../objects/User.object';
import { UserSearchInput } from '../inputs/UserSearch.input';
import { NftEntity } from 'server/models/Nft/entities/Nft.entity';
import { UserCreateInput } from '../inputs/UserCreate.input';

/**
 * User 와 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class UserResolver {
  /**
   * 새로운 User 를 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => Boolean)
  async createUser(@Arg('data') data: UserCreateInput) {
    try {
      const { accessToken, walletAddress } = data;
      const { userId, verifyEmail, provider, email }: any = jwt.decode(accessToken);

      let user = await UserEntity.findOneBy({ userId: userId });
      // let user = null;

      if (!!user) {
        return false;
      }
      if (!user) {
        const result = await UserEntity.create({
          userId: userId,
          provider: provider,
          verifyEmail: verifyEmail,
          email: email,
          walletAddress: walletAddress,
        }).save();
        return !!result.id;
      }
    } catch (e) {
      console.log(e);
    }
  }

  //마이페이지 업데이트 API
  @Mutation(() => Boolean)
  async updateUser(@Ctx() ctx: Context, @Arg('data') data: UserUpdateInput) {
    try {
      const userId = ctx?.user?.userId;

      const result = await createQueryBuilder()
        .update(UserEntity)
        .set({
          nickname: data.nickname,
          sex: data.sex,
          introduceText: data.introduceText,
          birthDate: data.birthDate,

          urlAddress: data.urlAddress,
          backgroundImage: data.backgroundImage,
          profileImage: data.profileImage,
        })
        .where('userId = :userId', { userId: userId })
        .execute();
      // console.log(‘result:’, result.affected);
      return result.affected;
    } catch (e) {
      console.log(e);
    }
  }

  //ctx값의 userId가지고 자신의 정보 리턴해주는 리졸버
  @Query(() => UserObject, { nullable: true })
  async userMe(@Ctx() ctx: Context) {
    try {
      const userId = ctx?.user?.userId;

      // console.log(userId, '유저아이디');

      const result = await UserEntity.createQueryBuilder('user')
        .leftJoinAndSelect('user.nfts', 'nft')
        .where('user.userId = :userId', { userId: userId })
        .getOne();

      // console.log(result, '미쿼리');

      return result;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //tokenID를 받아와서 User 조회 후에 유저 데이터 받아오기.
  @Query(() => UserObject, { nullable: true })
  async searchUserDataByTokenId(@Arg('data') data: UserSearchInput) {
    try {
      const tokenId = data?.tokenId;

      const result = await NftEntity.createQueryBuilder('nft')
        .leftJoinAndSelect('nft.user', 'user')
        .where('nft.tokenId = :tokenId', { tokenId: tokenId })
        .getOne();

      console.log(tokenId, '톸큰아이디', result, '미쿼리');

      return result?.user;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  //tokenID를 받아와서 User 조회 후에 유저 데이터 받아오기.
  @Query(() => UserObject, { nullable: true })
  async searchUserDataByWalletAddress(@Arg('data') data: UserSearchInput) {
    try {
      const walletAddress = data?.walletAddress;

      const result = await UserEntity.createQueryBuilder('user')
        .leftJoinAndSelect('user.nfts', 'nft')
        .where('user.walletAddress = :walletAddress', {
          walletAddress: walletAddress,
        })
        .getOne();

      console.log(walletAddress, '톸큰아이디', result, '미쿼리');

      return result;
    } catch (e) {
      console.log('userMeError', e);
    }
  }
}
