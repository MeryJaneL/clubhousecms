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
export class EventCreateInput {
  @Field({nullable: true})
  fee: string;

  @Field()
  from: string;

  @Field({nullable: true})
  to: string;

  @Field()
  eventType: string;

  @Field()
  tokenId: string;

  @Field()
  transactionHash: string;
}
