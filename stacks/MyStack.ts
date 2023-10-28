import { StackContext, Api, Function } from "sst/constructs";

export function API({ stack }: StackContext) {
  const basicFun = new Function(stack, "basic", {
    handler: "packages/basic-python/index.handler",
    runtime: "python3.11",
    architecture: "arm_64",
    environment: {
      POSTGRESQL_URL: process.env.POSTGRESQL_URL!,
    },
  });
  const poetryFun = new Function(stack, "poetry", {
    handler: "packages/poetry-python/index.handler",
    runtime: "python3.11",
    architecture: "arm_64",
    environment: {
      POSTGRESQL_URL: process.env.POSTGRESQL_URL!,
    },
  });
  const api = new Api(stack, "api", {
    routes: {
      "GET /": basicFun,
      "GET /poetry": poetryFun,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
