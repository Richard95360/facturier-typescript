//Method decorator
export function bind(target, name, descriptor) {
    const orgMethod = descriptor.value;
    const newDescriptor = {
        get() {
            return orgMethod.bind(this);
        }
    };
    return newDescriptor;
}
