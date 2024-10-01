import expressApp from './app';

const PORT = process.env.PORT || 3000;

export const StartServer = async () => {
    expressApp.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
        console.log('Unhandled rejection : ' + err);
        process.exit(1);
    });
}

StartServer().then(() => {
    console.log('Server started');
});