import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { HTTP_REQUEST_TIMEOUT } from "@/assets/javascripts/common";

type AxiosLockReleaseFunction = (requestedId: string) => void;

// 작은 값
const EPSILON = 500;

// HTTP 요청 보다 조금 늦게 락 타임아웃을 실행
const LOCK_TIMEOUT = HTTP_REQUEST_TIMEOUT + EPSILON;

interface AxiosTimoutLockConfig extends AxiosRequestConfig {
  lockId?: string;
}

interface AxiosTimeoutLockResponse<T> {
  response: AxiosResponse<T>;
  release: AxiosLockReleaseFunction;
  lockId: string;
}

class AxiosTimoutLock {
  _id: string;
  _locked: boolean;
  _lock: Promise<void> | undefined;
  _timer: NodeJS.Timeout | undefined;
  release!: AxiosLockReleaseFunction;

  constructor() {
    this._id = "undefined";
    this._locked = false;
    this._lock = undefined;
    this._timer = undefined;
  }

  _randomSeed() {
    return Math.trunc(Math.random() * 1000);
  }

  getId(seed: string) {
    return `${new Date().toISOString()}@${this._randomSeed()}@${seed}`;
  }

  async lock(id: string) {
    // 락이 걸린 상태면, 해제 될 때까지 기다림
    if (this._locked && this._lock !== undefined) {
      await this._lock;
    }

    // 락 실행
    this._id = id;
    this._locked = true; // 락 잠금
    // console.log(`AxiosTimoutLock locking: ${this._id}, ${this._locked}`);

    this._lock = new Promise<void>((resolve, reject) => {
      this.release = (requestedId: string) => {
        if (requestedId === this._id) {
          // 잠근 주체만 해제 할 수 있음

          this._locked = false; // 락 해제
          if (this._timer) {
            // 타이머 해제
            clearTimeout(this._timer);
          }

          if (resolve) {
            console.log(`AxiosTimoutLock releasing: ${id}`);
            resolve();
          } else {
            Promise.resolve();
          }
        } else {
          // 다른 곳에서 해제가 요청되면, 에러
          throw new Error(
            `${this._id} got an invalid unlock request from ${requestedId} `
          );
        }
      };

      // 락 해제 시, 타이머가 올바르게 클리어 (clearTimeout) 되지 않았으면,
      // LOCK_TIMEOUT 이후 무조건 타이머가 실행 됨
      this._timer = setTimeout(() => {
        if (this._locked) {
          if (this._id === id) {
            reject(
              `AxiosTimoutLock fail after timeout: ${this._id} from ${id}`
            ); // 실패, this._id 에 해당하는 Promise 에서 reject 실행
          } else {
            console.log(
              `AxiosTimoutLock succeed(source-locking) after timeout: ${this._id} from ${id}`
            );
            resolve(); // 성공, id 에 해당하는 Promise 에서 resolve 실행
          }
        } else {
          console.log(
            `AxiosTimoutLock succeed(origin-released) after timeout: ${this._id} from ${id}`
          );
          resolve();
        }

        this._locked = false; // 에러에 상관없이 락 개방
      }, LOCK_TIMEOUT);
    });

    console.log(`AxiosTimoutLock locked: ${this._id}, ${this._locked}`);
  }

  isLocked(selfId: string | undefined) {
    if (this._id === selfId) {
      return false;
    } else {
      return this._locked;
    }
  }

  waitUntilReleased(waitId: string | undefined) {
    if (this._lock === undefined) {
      console.log(`${waitId} got undefined lock`);
      return new Promise<void>((resolve) => {
        resolve();
      });
    }

    console.log(`${waitId} is now waiting for ${this._id}`);
    return this._lock;
  }
}

const axiosTimeoutLock = new AxiosTimoutLock();

export { axiosTimeoutLock };
export type { AxiosTimoutLockConfig, AxiosTimeoutLockResponse };
