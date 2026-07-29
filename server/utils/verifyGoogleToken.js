import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);


export const verifyGoogleToken = async (
    credential
) => {

    const ticket =
        await client.verifyIdToken({

            idToken: credential,

            audience:
                process.env
                .GOOGLE_CLIENT_ID,

        });

    const payload =
        ticket.getPayload();

    return {

        name:
            payload.name,

        email:
            payload.email,

        picture:
            payload.picture,

        sub: payload.sub    

    };

};