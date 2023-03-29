import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as apigateway from "@pulumi/aws-apigateway";

const stack = pulumi.getStack();
const project = pulumi.getProject();

const pichinchaConfig = new pulumi.Config("pichincha");
const hostname = pichinchaConfig.require('hostname');


const listener = new awsx.elasticloadbalancingv2.NetworkListener("pichincha-api-" + stack, { port: 5000 });

const service = new awsx.ecs.FargateService("pichincha-api-" + stack, {
    desiredCount: 2,
    taskDefinitionArgs: {
        containers: {
            pichinchaApp: {
                image: awsx.ecs.Image.fromPath("pichincha-api-" + stack, "../"),
                memory: 512,
                portMappings: [listener],
            },
        },
    },
    healthCheckGracePeriodSeconds: 2147483646
});

const host = listener.endpoint.hostname
const api = new awsx.apigateway.API("api" + stack, {
  routes: [{
        path: "/",
        target: {
            uri: hostname,
            type: "http_proxy",
        },
    }],
});

export const url = api.url;
export const webUrl: pulumi.Output<string> = listener.endpoint.hostname;

