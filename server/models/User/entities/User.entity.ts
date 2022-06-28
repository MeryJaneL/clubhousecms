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
  OneToMany,
} from 'typeorm';

/**
 * 데이터베이스와 연결된 Entity 입니다.
 *
 * @author BounceCode, Inc.
 */
@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  userId: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true, unique: true})
  walletAddress: string;

  @Column({nullable: true})
  nickname: string;

  @Column({nullable: true})
  urlAddress: string;

  @Column({nullable: true})
  backgroundImage: string;

  @Column({nullable: true})
  profileImage: string;

  @Column({nullable: true})
  provider: string;

  @Column({nullable: true})
  verifyEmail: boolean;

  @Column({nullable: true})
  sex: string;

  @Column({nullable: true})
  introduceText: string;

  @Column({nullable: true})
  birthDate: Date;

  //관계
  @OneToMany(
    type => NftEntity,
    nft => nft.user,
    {
      cascade: false,
    },
  )
  nfts: NftEntity[];

  //빠져야할것들
  @Column({nullable: true})
  instaAddress: string;

  @Column({nullable: true})
  homepageAddress: string;
  //

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn({nullable: true})
  deletedDate: Date;
}
