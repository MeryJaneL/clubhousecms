/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {NftEntity} from 'server/models/Nft/entities/Nft.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  fee: string;

  @Column()
  from: string;

  @Column({nullable: true})
  to: string;

  @Column()
  tokenId: string;

  @Column()
  eventType: string;

  @Column()
  transactionHash: string;

  @Column({default: false})
  transactionLogginCompleted: boolean;

  //관계
  @ManyToOne(
    type => NftEntity,
    nft => nft.events,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'tokenId',
    referencedColumnName: 'tokenId',
  })
  nft: NftEntity;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({nullable: true})
  deletedDate: Date;
}
