/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {ObjectType, Field, ID, Int} from 'type-graphql';
import {NftObject} from 'server/models/Nft/objects/Nft.object';

@ObjectType()
export class EventObject {
  @Field({nullable: true})
  id: number;
  @Field({nullable: true})
  fee: string;
  @Field({nullable: true})
  from: string;
  @Field({nullable: true})
  to: string;
  @Field({nullable: true})
  tokenId: string;
  @Field({nullable: true})
  eventType: string;
  @Field(type => NftObject, {nullable: true})
  nft: NftObject;
  @Field({nullable: true})
  transactionHash: string;
  @Field({nullable: true})
  createdDate: Date;
}
