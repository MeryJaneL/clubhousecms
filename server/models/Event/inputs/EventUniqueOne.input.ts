import {Field, InputType} from 'type-graphql';

@InputType()
export class EventUniqueOneInput {
  @Field({nullable: true})
  id: number;
}
