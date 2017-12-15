# Aurelia Framework 7 Typescript Sample #

This repository is to demonstrate the usage of [aurelia-framework7-typescript](https://github.com/radical-systems-australia/aurelia-framework7-typescript), and to facilitate its development.

At the moment there is no package deployed in NPM, so either include a dependency in package.json:
```typescript
'aurelia-framework7-typescript': 'git@github.com:radical-systems-australia/aurelia-framework7-typescript.git'
```

# Setup for development in aurelia-framework7-typescript #

If you inlcude the package as above you will be linking to the js files, meaning that you will need to build the whole library i fyou are playing around with aurelia-framework7-typescript.

A better option is to clone the repository inside node_modules and add the following to the webpack configuration:

```typescript
alias :{ 
        'aurelia-framework7-typescript':'aurelia-framework7-typescript/src/index' 
}
```

This will point to the typescript, avoiding any compilations.

Why do we need to clone the repository insode node_modules? Due to an issue with aurelia-webpack-loader:

https://github.com/aurelia/webpack-plugin/pull/122

