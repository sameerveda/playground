<script>
  import { BehaviorSubject, withLatestFrom } from 'rxjs';
  import { toReadable } from '../utils/utils';

  const btn1$ = new BehaviorSubject(1);
  const btn2$ = new BehaviorSubject(100);
  const result = toReadable(btn1$.pipe(withLatestFrom(btn2$)));
</script>

<div id="rxjs-playground">
  <button on:click={() => btn1$.next(btn1$.value + 1)}>btn 1</button>
  <button on:click={() => btn2$.next(btn2$.value + 1)}>btn 2</button>

  <div>
    <code>Result {$result}</code>
  </div>
</div>

<style>
  #rxjs-playground {
    padding: 1rem;
  }
</style>
