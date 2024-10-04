export abstract class Entity<P> {
    public initialState: P;
    public props: P;

    constructor(props: P) {
        this.initialState = props;
        this.props = props;

        Object.freeze(this.initialState);
    }

    update(props: Partial<P>) {
        this.props = {
            ...this.props,
            ...props
        }
    }

    commit() {
        this.initialState = {...this.props};
    }
}