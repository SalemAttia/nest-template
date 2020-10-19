import { Connection } from 'mongoose';
import { ResetPasswordSchema } from '../../database/schemas/resetPassword.schema';

export const resetPasswordProviders = [
  {
    provide: 'RESET_PASSWORD_MODEL',
    useFactory: (connection: Connection) => connection.model('ResetPassword', ResetPasswordSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];