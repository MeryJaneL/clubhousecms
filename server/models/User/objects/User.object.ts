/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {NftObject} from 'server/models/Nft/objects/Nft.object';
import {ObjectType, Field, ID, Int} from 'type-graphql';

/**
 * {@link UserResolver} 에서 반환되는 데이터를 확인하기위한 ObjectType 입니다.
 *
 * @author BounceCode, Inc.
 */
@ObjectType()
export class UserObject {
  @Field({nullable: true})
  email: string;

  @Field({nullable: true})
  walletAddress: string;

  @Field({nullable: true})
  nickname: string;

  @Field({nullable: true})
  sex: string;

  @Field({nullable: true})
  introduceText: string;

  @Field({nullable: true})
  birthDate: Date;

  @Field({nullable: true})
  urlAddress: string;

  @Field({nullable: true})
  backgroundImage: string;

  @Field({nullable: true})
  profileImage: string;

  @Field({nullable: true})
  provider: string;

  @Field({nullable: true})
  verifyEmail: string;

  @Field(type => [NftObject], {nullable: true})
  nfts: NftObject[];

  //빼야하는 것들
  @Field({nullable: true})
  instaAddress: string;

  @Field({nullable: true})
  homepageAddress: string;
  ///
}
