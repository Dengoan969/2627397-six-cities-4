import { Container } from 'inversify';
import { Component } from '../shared/types/component.enum.js';

import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../shared/libs/database/index.js';

import { UserModel } from '../shared/modules/user/user.entity.js';
import { DefaultUserService } from '../shared/modules/user/default-user.service.js';

import { OfferModel } from '../shared/modules/offer/offer.entity.js';
import { DefaultOfferService } from '../shared/modules/offer/default-offer.service.js';
import { RestApplication } from './rest.application.js';
import { CommentModel } from '../shared/modules/comment/comment.entity.js';
import { DefaultCommentService } from '../shared/modules/comment/default-comment.service.js';

import { ExceptionFilterInterface } from '../shared/exception-filter/exception-filter.interface.js';
import { ExceptionFilter } from '../shared/exception-filter/exception-filter.js';
import { UserController } from '../shared/modules/user/user.controller.js';
import { BaseController } from '../shared/controller/base.controller.js';
import OfferController from '../shared/modules/offer/offer.controller.js';
import { CommentController } from '../shared/modules/comment/comment.controller.js';

export function createAppContainer(): Container {
  const container = new Container();

  container.bind<Logger>(Component.Logger).toConstantValue(new PinoLogger(true));

  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  container.bind(Component.UserModel).toConstantValue(UserModel);
  container.bind(Component.UserService).to(DefaultUserService).inSingletonScope();

  container.bind(Component.OfferModel).toConstantValue(OfferModel);
  container.bind(Component.OfferService).to(DefaultOfferService).inSingletonScope();

  container.bind(Component.CommentModel).toConstantValue(CommentModel);
  container.bind(Component.CommentService).to(DefaultCommentService).inSingletonScope();

  container.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();

  container.bind<BaseController>(Component.UserController).to(UserController).inSingletonScope();
  container.bind<BaseController>(Component.OfferController).to(OfferController).inSingletonScope();
  container.bind<BaseController>(Component.CommentController).to(CommentController).inSingletonScope();

  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();


  return container;
}
