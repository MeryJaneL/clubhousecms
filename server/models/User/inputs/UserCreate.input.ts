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
export class UserCreateInput {
  @Field()
  accessToken: string;

  @Field()
  walletAddress: string;
}
