import { Category } from './types';

export const PHOTO_CATEGORIES: Category[] = [
  {
    id: 'portraits',
    name: 'Ritratti',
    photos: [
      { id: 1, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481843/MME-26_ls4pjm.jpg', width: 5995, height: 3997, alt: 'Atletica' },
      { id: 2, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481865/MME-33_e4moll.jpg', width: 5458, height: 3639, alt: 'Thomas' },
      { id: 3, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481857/MME-28_hs2pfq.jpg', width: 5731, height: 3821, alt: 'Atletica Herculis' },
      { id: 4, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481868/MME-42_ylvp5e.jpg', width: 800, height: 1200, alt: 'A portrait conveying a sense of waiting' },
      { id: 5, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481857/MME-31_eohj2j.jpg', width: 800, height: 900, alt: 'A portrait playing with shadows' },
      { id: 6, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481846/MME-13_tnlnqw.jpg', width: 800, height: 1100, alt: 'A raw and expressive portrait' },
      { id: 19, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481836/MME-21_ekfgdn.jpg', width: 800, height: 1200, alt: 'A compelling vertical portrait' },
      { id: 20, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481863/MME-41_ydseoz.jpg', width: 1200, height: 800, alt: 'A portrait in a wide setting' },
      { id: 21, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481852/MME-27_zvt1cx.jpg', width: 1200, height: 900, alt: 'A candid portrait' },
      { id: 22, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481813/MME-12_s6sqzm.jpg', width: 1000, height: 800, alt: 'A portrait with soft lighting' },
      { id: 23, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481866/MME-36_vn3gql.jpg', width: 1100, height: 800, alt: 'An environmental portrait' },
      { id: 24, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481823/MME-11_ecg5uo.jpg', width: 1000, height: 1000, alt: 'A square format portrait' },
      { id: 25, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481800/MME-1-3_gjneuk.jpg', width: 1200, height: 850, alt: 'A cinematic portrait' },
    ],
  },
  {
    id: 'landscapes',
    name: 'Paesaggi',
    photos: [
      { id: 26, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481872/MME-29_zwlait.jpg', width: 1200, height: 800, alt: 'A sweeping landscape view' },
      { id: 27, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481870/MME-38_yiy5gx.jpg', width: 800, height: 1200, alt: 'A vertical landscape of a mountain peak' },
      { id: 28, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481848/MME-20_yg1vip.jpg', width: 1200, height: 900, alt: 'A serene landscape with a lake' },
      { id: 29, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481847/MME-22_usp7xc.jpg', width: 1000, height: 1000, alt: 'A square shot of a desert landscape' },
      { id: 30, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481817/MME-5_u2cd6r.jpg', width: 1200, height: 800, alt: 'A coastal landscape at sunset' },
      { id: 31, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481800/MME-10_wzkzvs.jpg', width: 900, height: 1200, alt: 'A forest landscape with tall trees' },
    ],
  },
  {
    id: 'black-and-white',
    name: 'Bianco e Nero',
    photos: [
      { id: 13, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481864/MME-32_jy3to3.jpg', width: 1000, height: 1000, alt: 'A black and white photo focusing on essential forms' },
      { id: 14, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481842/MME-18_tkvvat.jpg', width: 800, height: 1200, alt: 'A high-contrast black and white portrait' },
      { id: 15, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481835/MME-8_miuens.jpg', width: 1200, height: 800, alt: 'Black and white urban geometry' },
      { id: 16, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481820/MME-7_ukdcxp.jpg', width: 1000, height: 1000, alt: 'A textured black and white close-up' },
      { id: 17, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481812/MME-6_icwouf.jpg', width: 1200, height: 900, alt: 'A powerfully silent black and white landscape' },
      { id: 18, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481835/MME-9_ayymxj.jpg', width: 800, height: 1200, alt: 'A black and white image defined by a line of shadow' },
    ],
  },
  {
    id: 'other',
    name: 'Altro',
    photos: [
      { id: 7, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481852/MME-25_slkrqg.jpg', width: 1200, height: 800, alt: 'Action shot of a decisive moment in sports' },
      { id: 8, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481809/MME-4_v0unyo.jpg', width: 1200, height: 900, alt: 'A photo capturing pure speed in a sporting event' },
      { id: 32, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481827/MME-2_njeo4e.jpg', width: 1200, height: 800, alt: 'Placeholder for another miscellaneous photo' },
      { id: 33, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481823/MME-15_fqmxlq.jpg', width: 800, height: 1200, alt: 'Placeholder for another miscellaneous photo' },
      { id: 34, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481807/MME-2-2_qdiofc.jpg', width: 1000, height: 1000, alt: 'Placeholder for another miscellaneous photo' },
      { id: 35, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481798/MME-1-2_yiovmj.jpg', width: 1200, height: 900, alt: 'Placeholder for another miscellaneous photo' },
      { id: 36, url: 'https://res.cloudinary.com/dzwfde1hy/image/upload/v1752481803/MME-1_yjrz77.jpg', width: 900, height: 1200, alt: 'Placeholder for another miscellaneous photo' },
    ],
  },
];