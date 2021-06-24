class BaseService {
  constructor(model) {
    this.model = model
    this.filename = model.name.toLowerCase()
  }

  getAll() {
    return this.model.find()
  }

  async insert(object) {
    const instance = await this.model.create(object)
    return instance
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
