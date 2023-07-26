export const getCommentByDateQuery = `query Comments($date: DateTime!) {
  comments(
    query: {image_date: $date}
  ) {
    _id
    date
    image_date
    text
  }
}`;

export const getCommentsByDateRangeQuery = `query Comments($start_date: DateTime!, $end_date: DateTime!) {
    comments(
      query: {image_date_gte: $start_date, image_date_lte: $end_date}
      sortBy: DATE_DESC
    ) {
      _id
      date
      image_date
      text
    }
}`;

export const insertOneComment = `mutation InsertOneComment($image_date: DateTime!, $date: DateTime!, $text: String!) {
  insertOneComment(
    data: {image_date: $image_date, text: $text, date: $date}
  ) {
    date
    image_date
    text
  }
}`;
