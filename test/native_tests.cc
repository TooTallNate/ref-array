#include <stdlib.h>
#include "nan.h"

using namespace node;

namespace {

void Initialize(v8::Handle<v8::Object> target) {
  Nan::HandleScope scope;

}

} // anonymous namespace

NODE_MODULE(native_tests, Initialize);
