import { z } from 'zod';

const topicOptions = [
  'Artificial Intelligence',
  'Blockchain',
  'Cloud Computing',
  'Cyber Security',
  'Data Science',
  'DevOps',
  'Internet of Things',
  'Machine Learning',
  'Mobile Development',
  'Programming Languages',
  'Quantum Computing',
  'Software Architecture',
  'Software Engineering',
  'Web Development',
  'Android Development',
  'iOS Development',
  'Backend Development',
  'Leadership',
] as const;

const Topics = z.enum(topicOptions);

export default Topics;
