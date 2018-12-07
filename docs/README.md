# Introduction

Welcome to the documentation of the modular (x)ross (p)latform (f)rame(w)ork **xpfw**.

xpfw is a collection of packages to ease the usage of forms CRUD-UI's in React (Native). easy and backend independent.

In case you want a ready to go package check out the [quick start](quickstart.md) or the readily usable [stacks](stacks/overview.md).

If you wish to find more about the framework and its customization options you should get to know the three main packages:
- **Core**: Do [form](core/validate.md) and [permission](core/permissions.md) validations based on an [IForm definition](core/definition.md).
- **Forms**:  [Themable](forms/themes.md) React (Native) Components to render [IForm definition](core/definition.md).
- **UI**: [Themable](forms/themes.md) React (Native) Components to get a full CRUD from an [IForm definition](core/definition.md).


## Preact
xpfw has full preact compatability. In fact all jest tests use preact instead of react to render, and the [live demo / website](https://xpfw.github.io) is built with preact as well.