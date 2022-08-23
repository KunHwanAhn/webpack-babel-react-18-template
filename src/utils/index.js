// eslint-disable-next-line import/prefer-default-export
export function getImageUrl(person, size = 's') {
  return (
    `https://i.imgur.com/${
      person.imageId
    }${size
    }.jpg`
  );
}
