import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-northeast-1_3KNyrYBFc",
    ClientId:"2f80c2dco9d6cbmqjf0rn5d3p"
}

export default new CognitoUserPool(poolData);