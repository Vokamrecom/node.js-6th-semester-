class Commit {
    constructor(id, repoId, message, hash) {
      this.id = id;
      this.repoId = repoId;
      this.message = message;
      this.hash = hash;
    }
  }
  
module.exports = Commit;