/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {Field, InputType} from 'type-graphql';

/**
 * {@link UserResolver} 에서 입력된 데이터를 확인하기위한 InputType 입니다.
 *
 * @author BounceCode, Inc.
 */
@InputType()
export class UserUpdateInput {
  @Field({nullable: true})
  nickname: string;

  @Field({nullable: true})
  walletAddress: string;

  @Field({nullable: true})
  urlAddress: string;

  @Field({nullable: true})
  backgroundImage: string;

  @Field({nullable: true})
  profileImage: string;

  @Field({nullable: true})
  sex: string;

  @Field({nullable: true})
  introduceText: string;

  @Field({nullable: true})
  birthDate: Date;

  //빼야하는 것들
  @Field({nullable: true})
  instaAddress: string;

  @Field({nullable: true})
  homepageAddress: string;
  ///
}
