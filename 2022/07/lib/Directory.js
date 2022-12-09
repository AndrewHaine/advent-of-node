class Directory {
    constructor(name, parent) {
      this.name = name;
      this.parent = parent;
      this.directories = {};
      this.files = {};
    }

    parent() {
      return this.parent;
    }

    directories() {
      return this.directories;
    }

    addDirectory(directory)  {
      this.directories[directory.name] = directory;
    }

    files() {
      return this.files;
    }

    addFile(name, size) {
      this.files[name] = Number(size);
    }
}

export default Directory;