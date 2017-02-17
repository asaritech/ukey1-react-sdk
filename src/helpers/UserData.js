'use strict';

function UserData(data) {
  this.rawData = data;
};

UserData.prototype.getId = function () {
  return this.rawData.id;
};

UserData.prototype.getFullName = function () {
  return this.rawData.name.display;
};

UserData.prototype.getFirstName = function () {
  return this.rawData.name.first_name;
};

UserData.prototype.getForename = function () {
  return this.getFirstName();
};

UserData.prototype.getSurname = function () {
  return this.rawData.name.surname;
};

UserData.prototype.getLastName = function () {
  return this.getSurname();
};

UserData.prototype.getLanguage = function () {
  return this.rawData.locale.language;
};

UserData.prototype.getCountry = function () {
  return this.rawData.locale.country;
};

UserData.prototype.getEmail = function () {
  var r;

  if (this.rawData.email && typeof this.rawData.email === 'string') {
    r = this.rawData.email;
  } else {
    r = null;
  }

  return r;
};

UserData.prototype.getImage = function () {
  var r;

  if (this.rawData.thumbnail && typeof this.rawData.thumbnail.url === 'string') {
    r = this.rawData.thumbnail.url;
  } else {
    r = null;
  }

  return r;
};

UserData.prototype.getThumbnail = function () {
  return this.getImage();
};

module.exports = UserData;
