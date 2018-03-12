const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return '/wiki/' + this.getDataValue('title');
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

Page.hook('beforeValidate', (page, options) => {
    page.urlTitle = generateUrlTitle(page.title);
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

function generateUrlTitle (title) {
    if (title) {
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      return Math.random().toString(36).substring(2, 7);
    }
}

module.exports = {
    db: db,
  Page: Page,
  User: User
}

