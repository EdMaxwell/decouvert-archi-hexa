import {DockerComposeEnvironment, StartedDockerComposeEnvironment} from "testcontainers";
import path from "path";


let instance: StartedDockerComposeEnvironment | null = null;


export const startDocker = async () => {
    const composeFilePath = path.resolve(__dirname)
    const composeFile = 'docker-compose.yml';

    instance = await new DockerComposeEnvironment(composeFilePath, composeFile).up();
    console.log('Docker started');
}

export const stopDocker = async () => {
    if (instance) {
        try {
            await instance.down();
            instance = null;
            console.log('Docker stopped');
        } catch (e) {
            console.log('Error stopping docker', e);
        }
    }
}

export const getDockerInstance = () => {
    if (!instance) {
        throw new Error('Docker not running');
    }
    return instance;
};