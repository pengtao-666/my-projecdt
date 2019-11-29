module.exports = {
  format(req) {
    let query;
    switch (req.method) {
      case 'GET':
        query = req.query;
        break;
      case 'POST':
        query = req.body;
        break;
    }
    return query
  }
}