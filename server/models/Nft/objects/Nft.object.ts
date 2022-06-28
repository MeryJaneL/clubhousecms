/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {EventObject} from 'server/models/Event/objects/Event.object';
import {UserObject} from 'server/models/User/objects/User.object';
import {ObjectType, Field, ID, Int} from 'type-graphql';

@ObjectType()
export class NftObject {
  @Field({nullable: true})
  id: number;
  @Field({nullable: true})
  name: string;
  @Field({nullable: true})
  image: string;
  @Field({nullable: true})
  description: string;
  @Field({nullable: true})
  category: string;
  @Field({nullable: true})
  tokenId: string;
  @Field(type => [EventObject], {nullable: true})
  events: EventObject[];
  @Field(type => UserObject, {nullable: true})
  user: UserObject;
  @Field({nullable: true})
  tokenURI: string;
}
