import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

import { config } from './config';

const imageBuilder = createImageUrlBuilder(config);

export const urlFor = (source: Image) => imageBuilder.image(source);
