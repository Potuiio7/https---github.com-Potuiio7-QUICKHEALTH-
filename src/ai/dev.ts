import { config } from 'dotenv';
config({ path: '.env' });

import '@/ai/flows/predict-real-time-wait-times.ts';
import '@/ai/flows/generate-landing-page-content.ts';
