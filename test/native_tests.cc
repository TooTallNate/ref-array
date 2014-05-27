#include <stdlib.h>
#include "nan.h"

using namespace node;

namespace {

void Initialize(v8::Handle<v8::Object> target) {
  NanScope();

}

} // anonymous namespace

NODE_MODULE(native_tests, Initialize);
