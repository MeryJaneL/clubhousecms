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
export class NftCreateInput {
  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  image: string;

  @Field({nullable: true})
  description: string;

  @Field({nullable: true})
  category: string;

  @Field({nullable: true})
  walletAddress: string;

  @Field({nullable: true})
  tokenId: string;

  @Field({nullable: true})
  tokenURI: string;
}
