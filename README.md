# extract-docker-baseimg-recipe
Docker (OCI) base images recipe extractor.

## FAQ
**Question:** What is this?

**Answer**: This is a simple cli program to extract Docker (OCI format) base images recipe for example: tags, platforms, versions etc.
##

**Question**: Where do you use this?

**Answer**: It is used in my *Docker (OCI format) base images build system*, for example [Hazmi35/docker-node](https://github.com/Hazmi35/docker-node).
It isn't made to be used by public. But you can use/modify it anyway
##

**Questions:** How does this works?

**Answer:** It reads a comment in line 1, 2 and 3 for image tags, variant, and target platforms respectively and it extracts the version from the line 4 which is a FROM instruction, for example: `FROM node:16.13.1-alpine`, it will extract the version "16.13.1". This is intended, because most of my base images are just docker official images with some modifications in it, atleast for now, because this will probably change when [Hazmi35/devcontainer](https://github.com/Hazmi35/devcontainer) is finished.