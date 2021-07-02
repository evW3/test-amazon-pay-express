import { app } from './configureServer';
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 80;

export const server = app.listen(PORT, () => console.log(`[SERVER]: Started on port: ${ PORT }!`));