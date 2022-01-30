import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  User,
  Car,
  Brand,
  CarHistory,
  CodeForAccounting,
  Company,
  Model,
  UserRole,
} from '@prisma/client';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { UserRoleEnumeration } from 'src/user/enums/user-role.enum';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

//type PrismaModels =
//type Subjects = InferSubjects<User | Car> | 'all';

//export type AppAbility = Ability<[Action, Subjects]>;

type PrismaSubjects = Subjects<{
  User: User;
  UserRole: UserRole;
  Car: Car;
  CarHistory: CarHistory;
  Brand: Brand;
  Model: Model;
  CodeForAccounting: CodeForAccounting;
  Company: Company;
}>;

export type PrismaAppAbility = PrismaAbility<[string, PrismaSubjects]>;

export const AppAbility = PrismaAbility as AbilityClass<PrismaAppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    if (user.userRoleId === UserRoleEnumeration.REGULAR) {
      cannot(Action.Manage, 'CarHistory');
    }

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<PrismaSubjects>,
    });
  }
}
