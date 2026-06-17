// plopfile.js
module.exports = function (plop) {
  plop.setGenerator('route', {
    description: 'Generate a route with shadcn-style structure',
    prompts: [
      {
        type: 'input',
        name: 'routeName',
        message: 'Route name (kebab-case):',
      },
    ],
    actions: function (data) {
      const pascalCase = str =>
        str
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.slice(1))
          .join('');

      const mainPageExport = `${pascalCase(data.routeName)}Page`;

      return [
        // Create main route folder
        {
          type: 'add',
          path: `./app/{{routeName}}/index.tsx`,
          templateFile: 'plop-templates/route-page.hbs',
        },
        // Create component folder
        {
          type: 'add',
          path: `./src/features/{{routeName}}/{{routeName}}.service.ts`,
          templateFile: 'plop-templates/service.hbs',
        },
        {
          type: 'add',
          path: `./src/features/{{routeName}}/{{routeName}}.schema.ts`,
          templateFile: 'plop-templates/schema.hbs',
        },
        {
          type: 'add',
          path: `./src/features/{{routeName}}/{{routeName}}.type.ts`,
          templateFile: 'plop-templates/type.hbs',
        },
        {
          type: 'add',
          path: `./src/features/{{routeName}}/hooks/use{{pascalCase routeName}}.hook.tsx`,
          templateFile: 'plop-templates/hook.hbs',
        },
        {
          type: 'add',
          path: `./src/features/{{routeName}}/{{routeName}}.screen.tsx`,
          templateFile:"plop-templates/screen.hbs"
        },
      ];
    },
  });
};
