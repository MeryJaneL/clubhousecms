/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import {EventEntity} from 'server/models/Event/entities/Event.entity';
import {UserEntity} from 'server/models/User/entities/User.entity';
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
  OneToMany,
} from 'typeorm';

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class NftEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  image: string;

  @Column({nullable: true})
  description: string;

  //NFT 현재 소유자의 지갑 주소
  @Column({nullable: true})
  walletAddress: string;

  //검색용으로 이것 정도는 따로 저장
  @Column({nullable: true})
  category: string;

  //고유 토큰 아이디
  @Column({nullable: true, unique: true})
  tokenId: string;

  //고유 토큰 아이디에 대한 tokenURI
  @Column({nullable: true})
  tokenURI: string;

  //관계
  @ManyToOne(
    type => UserEntity,
    user => user.nfts,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'walletAddress',
    referencedColumnName: 'walletAddress',
  })
  user: UserEntity;

  @OneToMany(
    type => EventEntity,
    event => event.nft,
    {
      cascade: false,
    },
  )
  events: EventEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({nullable: true})
  deletedDate: Date;
}
