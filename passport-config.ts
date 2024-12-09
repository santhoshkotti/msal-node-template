import { BearerStrategy, ITokenPayload } from 'passport-azure-ad';
import * as dotenv from 'dotenv';

dotenv.config(); 


const options = {
  identityMetadata: process.env.IDENTITY_METADATA!,
  clientID: process.env.CLIENTID!, // Your Azure AD app's client ID
  audience: [process.env.AUDIENCE!,process.env.CLIENTID!], // Application ID URI
  clientSecret: process.env.CLIENT_SECRET,
  validateIssuer: true,
  passReqToCallback:false,
  loggingLevel: 'info' as 'info',
};

const bearerStrategy = new BearerStrategy(options, (token: ITokenPayload, done: (err: any, user?: any) => void) => {
  console.log('Token validated:', token);
  done(null, token); // Token claims will be passed to the request
});

export default bearerStrategy;
