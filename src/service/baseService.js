class BaseService {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  async getAll() {
    return this.model.find()
  }

  async insert(object) {
    return this.model.create(object)
  }

  async removeById(value) {
    return this.model.deleteOne({ _id: value })
  }

  async update(id, object) {
    return this.model.findOneAndUpdate(id, object, { new: true })
  }

  async findById(id) {
    return this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.findById({ [property]: value })
  }

  async deleteAll() {
    return this.model.deleteMany()
  }
}

module.exports = BaseService
