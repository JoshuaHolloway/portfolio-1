exports.seed = function (knex, Promise) {
  return knex('quotes').insert([
    // {
    //   quote:
    //     'When you grow up you tend to get told that the world is the way it is and your life is just to live your life inside the world. Try not to bash into the walls too much... Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you. And you can change it, you can influence it… Once you learn that, you’ll never be the same again.',
    //   attributed_to: 'Steve Jobs',
    //   submitted_by: 'Josh',
    //   vote_up: 0,
    //   vote_down: 0,
    // },
    {
      quote:
        'Our future accomplishments are determined entirely by how every second in our life is put to a use. The future is the cumulation of many nows.',
      attributed_to: '',
      submitted_by: 'Josh Holloway',
      vote_up: 0,
      vote_down: 0,
    },
    {
      quote:
        'The best time to plant a tree was 20 years ago. The second best time is now.',
      attributed_to: 'Chinese Proverb',
      submitted_by: 'Josh H.',
      vote_up: 1,
      vote_down: 0,
    },
    {
      quote:
        "Grit is passion and perseverance for very long-term goals. Grit is having stamina. Grit is sticking with your future, day in, day out, not just for the week, not just for the month, but for years, and working really hard to make that future a reality. Grit is living life like it's a marathon, not a sprint.",
      attributed_to: 'Angela Lee Duckworth',
      submitted_by: '',
      vote_up: 0,
      vote_down: 0,
    },
  ]);
};
