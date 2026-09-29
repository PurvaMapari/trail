export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  city: string;
  avatarUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote:
      'TRAIL turned an ordinary Saturday afternoon into an adventure. Instead of walking straight to the station, we discovered two secret courtyards and a Japanese tea house.',
    author: 'Clara M.',
    role: 'Urban Wanderer',
    city: 'San Francisco',
  },
  {
    id: 't-2',
    quote:
      'The focus on the journey completely changes how you experience a city. You stop rushing from point A to B and start noticing the texture of neighborhoods.',
    author: 'Julian K.',
    role: 'Architect & Explorer',
    city: 'New York',
  },
  {
    id: 't-3',
    quote:
      'Curating our neighborhood bakery and vinyl shop trail gave our local community a fresh way to connect with visitors.',
    author: 'Maya Lin',
    role: 'Local Trail Curator',
    city: 'Seattle',
  },
];
