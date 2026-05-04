import express from 'express';
import {sendEmail} from './utils/email.js';

const app = express();


// sendEmail('kanakyadav9654@gmail.com', 'Test Subject', 'Test text', '<p>Test HTML</p>');

export default app;