import generate from 'nanoid/generate';

export function uid(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
  return generate(alphabet, 25);
}
