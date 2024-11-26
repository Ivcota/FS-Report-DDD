export abstract class UseCase<T, U> {
  abstract execute(input: T): Promise<U>;
}
