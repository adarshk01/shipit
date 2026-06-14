import Docker from "dockerode";
import fs from "fs";
import path from "path";
import * as tar from "tar";
const docker = new Docker({
  socketPath: "//./pipe/docker_engine",
});

interface containerType {
  image: string;
  cmd: string[];
  path: string;
  envVar?: string[];
}

export async function createContainer({
  image,
  cmd,
  path,
  envVar = [],
}: containerType) {
  const container = await docker.createContainer({
    Image: image,
    Cmd: cmd,
    Tty: false,
    Env: envVar,
    ExposedPorts: {
      "3001/tcp": {},
    },
    HostConfig: {
      AutoRemove: false,
      Memory: 1024 * 1024 * 1024,
      CpuShares: 512,

      PortBindings: {
        "3001/tcp": [
          {
            HostPort: "3001",
          },
        ],
      },
    },
  });

  return container;
}

export async function copyFromContainer(
  container: Docker.Container,
  containerPath: string,
  localDestPath: string
) {
  const stream = await container.getArchive({ path: containerPath });

  await fs.promises.mkdir(localDestPath, { recursive: true });

  await new Promise<void>((resolve, reject) => {
    stream.pipe(tar.extract({ cwd: localDestPath, strip: 1 }));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
}
