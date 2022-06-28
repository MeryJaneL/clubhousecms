/**
 * User 에 대한 Model 입니다.
 *
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import { Resolver, Query, Mutation, Ctx, Arg, Int } from 'type-graphql';
import { EventCreateInput } from '../inputs/EventCreate.input';
import { EventEntity } from '../entities/Event.entity';
import { NftEntity } from 'server/models/Nft/entities/Nft.entity';
import { EventObject } from '../objects/Event.object';
import { EventSearchInput } from '../inputs/EventSearch.input';
import { EventUniqueOneInput } from '../inputs/EventUniqueOne.input';
import { createQueryBuilder } from 'typeorm';

/**
 * User 와 관련된 요청을 처리합니다.
 *
 * @author BounceCode, Inc.
 */
@Resolver()
export class EventResolver {
  /**
   * 새로운 User 를 만듭니다.
   *
   * @author BounceCode, Inc.
   */
  @Mutation(() => Boolean)
  async createEvent(@Arg('data') data: EventCreateInput) {
    try {
      const nft = await NftEntity.findOneBy({ tokenId: data.tokenId });

      if (!nft) return false;

      const result = await EventEntity.create({ ...data, nft: nft }).save();

      return !!result.id;
    } catch (e) {
      console.log(e);
    }
  }

  @Query(() => [EventObject], { nullable: true })
  async getMyEvent(@Arg('data') data: EventSearchInput) {
    try {
      const tokenId = data.tokenId;

      const result = await NftEntity.createQueryBuilder('nft')
        .leftJoinAndSelect('nft.events', 'events')
        .where('nft.tokenId = :tokenId', { tokenId: tokenId })
        .getOne();

      return result?.events;
    } catch (e) {
      console.log('userMeError', e);
    }
  }

  @Mutation(() => Boolean)
  async eventSetLoggingCompleted(@Arg('where') where: EventUniqueOneInput) {
    try {
      // const event = await EventEntity.findOne({id: where.id});

      const event = await EventEntity.findOneBy({ id: where.id });

      if (!event) return false;

      const result = await createQueryBuilder()
        .update(EventEntity)
        .set({
          transactionLogginCompleted: true,
        })
        .execute();

      return result?.affected;
    } catch (e) {
      console.log(e);
    }
  }
}
