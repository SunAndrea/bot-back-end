import "reflect-metadata";
require("dotenv").config();

import express from "express";
import { useExpressServer } from "routing-controllers";

import { controllers } from "./controllers";
import { IService } from "types/serves";
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI as string;
const PORT = process.env.PORT;

export class Tcp implements IService {
  private static instance: Tcp;

  private routePrefix = "/api";
  public server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }

    return Tcp.instance;
  }

  async init() {
    const { server, routePrefix } = this;

    useExpressServer(server, {
      routePrefix,
      controllers,
      cors: true,
      defaultErrorHandler: true,
    });

    return new Promise<boolean>((resolve: any) => {
      mongoose.connect(DB_URI);
      server.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);

        return resolve(true);
      });
    });
  }
}
